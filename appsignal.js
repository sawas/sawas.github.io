import * as constants from './constants';

var OneSignal = window.OneSignal || [];
OneSignal.push(function () {
    OneSignal.init({
        appId: constants.ONESIGNALAPPID,
        requiresUserPrivacyConsent: true,
        autoRegister: false,
        notifyButton: {
            enable: true,
        },
    });
    OneSignal.registerForPushNotifications();
});