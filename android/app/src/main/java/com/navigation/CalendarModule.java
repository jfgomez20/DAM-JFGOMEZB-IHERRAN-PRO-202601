package com.navigation;

import android.content.Intent;
import android.provider.CalendarContract;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;

public class CalendarModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;

    public CalendarModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "CalendarModule";
    }

    @ReactMethod
    public void addEventToCalendar(
            String title,
            String location,
            String description,
            double startTime,
            double endTime,
            Promise promise
    ) {
        try {
            Intent intent = new Intent(Intent.ACTION_INSERT);
            intent.setData(CalendarContract.Events.CONTENT_URI);

            intent.putExtra(CalendarContract.Events.TITLE, title);
            intent.putExtra(CalendarContract.Events.EVENT_LOCATION, location);
            intent.putExtra(CalendarContract.Events.DESCRIPTION, description);
            intent.putExtra(CalendarContract.EXTRA_EVENT_BEGIN_TIME, (long) startTime);
            intent.putExtra(CalendarContract.EXTRA_EVENT_END_TIME, (long) endTime);
            intent.putExtra(CalendarContract.Events.ALL_DAY, false);

            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);

            reactContext.startActivity(intent);

            promise.resolve(true);
        } catch (Exception error) {
            promise.reject("CALENDAR_ERROR", "No se pudo abrir el calendario", error);
        }
    }
}