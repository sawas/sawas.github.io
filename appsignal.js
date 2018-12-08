const constants = {
    ONESIGNALAPPID: "591f8da3-a410-430b-b5db-6ab2e2af5e39",
}

var OneSignal = window.OneSignal || [];
OneSignal.push(function () {
    OneSignal.init({
        appId: constants.ONESIGNALAPPID,
        requiresUserPrivacyConsent: true,
        autoRegister: false,
        notifyButton: {
            enable: true,
        },
        promptOptions: {
            /* actionMessage limited to 90 characters */
            actionMessage: "We'd like to show you notifications for the latest news and updates.",
            /* acceptButtonText limited to 15 characters */
            acceptButtonText: "ALLOW",
            /* cancelButtonText limited to 15 characters */
            cancelButtonText: "NO THANKS"
        }
    });
    if (Notification.permission === "granted") {
        // Automatically subscribe user if deleted cookies and browser shows "Allow"
        OneSignal.registerForPushNotifications();
    } else {
        OneSignal.showHttpPrompt();
    }
});