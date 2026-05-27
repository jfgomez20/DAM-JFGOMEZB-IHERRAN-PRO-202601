package com.navigation;

import android.Manifest;
import android.app.Activity;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Build;

import androidx.core.app.NotificationCompat;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class NotificationModule extends ReactContextBaseJavaModule {

    private static final String CHANNEL_ID = "eventosub_channel";
    private static final String CHANNEL_NAME = "EventosUB";
    private final ReactApplicationContext reactContext;

    public NotificationModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
        createNotificationChannel();
    }

    @Override
    public String getName() {
        return "NotificationModule";
    }

    private void createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationManager notificationManager =
                    (NotificationManager) reactContext.getSystemService(ReactApplicationContext.NOTIFICATION_SERVICE);

            NotificationChannel channel = new NotificationChannel(
                    CHANNEL_ID,
                    CHANNEL_NAME,
                    NotificationManager.IMPORTANCE_HIGH
            );

            channel.setDescription("Notificaciones de eventos, recordatorios y confirmaciones de EventosUB.");

            if (notificationManager != null) {
                notificationManager.createNotificationChannel(channel);
            }
        }
    }

    @ReactMethod
    public void requestPermission(Promise promise) {
        try {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
                Activity activity = getCurrentActivity();

                if (activity == null) {
                    promise.resolve(false);
                    return;
                }

                if (activity.checkSelfPermission(Manifest.permission.POST_NOTIFICATIONS)
                        != PackageManager.PERMISSION_GRANTED) {
                    activity.requestPermissions(
                            new String[]{Manifest.permission.POST_NOTIFICATIONS},
                            2001
                    );
                }
            }

            promise.resolve(true);
        } catch (Exception error) {
            promise.reject("NOTIFICATION_PERMISSION_ERROR", "No se pudo solicitar permiso de notificaciones", error);
        }
    }

    @ReactMethod
    public void showNotification(String title, String message, Promise promise) {
        try {
            createNotificationChannel();

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
                if (reactContext.checkSelfPermission(Manifest.permission.POST_NOTIFICATIONS)
                        != PackageManager.PERMISSION_GRANTED) {
                    promise.resolve(false);
                    return;
                }
            }

            Intent intent = reactContext.getPackageManager()
                    .getLaunchIntentForPackage(reactContext.getPackageName());

            PendingIntent pendingIntent = PendingIntent.getActivity(
                    reactContext,
                    0,
                    intent,
                    Build.VERSION.SDK_INT >= Build.VERSION_CODES.M
                            ? PendingIntent.FLAG_IMMUTABLE | PendingIntent.FLAG_UPDATE_CURRENT
                            : PendingIntent.FLAG_UPDATE_CURRENT
            );

            NotificationCompat.Builder builder = new NotificationCompat.Builder(reactContext, CHANNEL_ID)
                    .setSmallIcon(R.mipmap.ic_launcher)
                    .setContentTitle(title)
                    .setContentText(message)
                    .setStyle(new NotificationCompat.BigTextStyle().bigText(message))
                    .setPriority(NotificationCompat.PRIORITY_HIGH)
                    .setAutoCancel(true)
                    .setContentIntent(pendingIntent);

            NotificationManager notificationManager =
                    (NotificationManager) reactContext.getSystemService(ReactApplicationContext.NOTIFICATION_SERVICE);

            if (notificationManager != null) {
                int notificationId = (int) System.currentTimeMillis();
                notificationManager.notify(notificationId, builder.build());
            }

            promise.resolve(true);
        } catch (Exception error) {
            promise.reject("NOTIFICATION_ERROR", "No se pudo mostrar la notificación", error);
        }
    }
}