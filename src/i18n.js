import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
    fallbackLng: "en",
    supportedLngs: ["en", "pl"],
    resources: {
        en: {
            translation: {
                Add: "Add",
                add: "added to",
                AddSub: "Date operation",
                AddSubHelpText: "What should happen to date when adding a new Content Object",
                ContentType: "Content type",
                DateField: "Date field",
                DateFieldHelpText: "The field that should have dynamic default date",
                Day: "Number of days",
                DayHelpText: "Number of days that should be {{addSub}} today's date when creating object",
                Empty: "There is no settings for this plugin",
                FieldNotFound: "This field is no longer available",
                FieldRequired: "This value should not be blank",
                Hour: "Number of hours",
                HourHelpText: "Number of hours that should be {{addSub}} today's date when creating object",
                Minute: "Number of minutes",
                MinuteHelpText: "Number of minutes that should be {{addSub}} today's date when creating object",
                Month: "Number of months",
                MonthHelpText: "Number of months that should be {{addSub}} today's date when creating object",
                NoContentTypes: "There is no content types",
                NoFields:
                    "Make sure the selected content type contains fields that can be used in the plugin. Allowed types: date time",
                SaveChanges: "Save changes",
                SavingError:
                    "Something occurred while updating plugin settings. Check console for more information",
                Settings: "Settings",
                SetToNow: "Set to now (today's date)",
                Subtract: "Subtract",
                subtract: "subtracted from",
                Year: "Number of years",
                YearHelpText: "Number of years that should be {{addSub}} today's date when creating object",
            },
        },
        pl: {
            translation: {
                Add: "Dodaj",
                add: "dodana do",
                AddSub: "Operacja na dacie",
                AddSubHelpText: "Co powinno stać się z datą przy tworzeniu nowego obiektu",
                ContentType: "Definicja typu",
                DateField: "Pole daty",
                DateFieldHelpText: "Pole które powinno mieć dynamiczną domyślną datę",
                Day: "Liczba dni",
                DayHelpText: "Liczba dni która powinna być {{addSub}} dzisiejszej daty w trakcie tworzenia obiektu",
                Empty: "Nie dodano żadnych ustawień do tego pluginu",
                FieldNotFound: "To pole nie jest już dostępne",
                FieldRequired: "Ta wartość nie powinna być pusta",
                Hour: "Liczba godzin",
                HourHelpText: "Liczba godzin która powinna być {{addSub}} dzisiejszej daty w trakcie tworzenia obiektu",
                Minute: "Liczba minut",
                MinuteHelpText: "Liczba minut która powinna być {{addSub}} dzisiejszej daty w trakcie tworzenia obiektu",
                Month: "Liczba miesięcy",
                MonthHelpText: "Liczba miesięcy która powinna być {{addSub}} dzisiejszej daty w trakcie tworzenia obiektu",
                NoContentTypes: "Nie znaleziono definicji typu",
                NoFields:
                    "Upewnij się, że wybrany typ definicji zawiera pola, które mogą być wykorzystane we wtyczce. Dozwolone typy: data i czas.",
                SaveChanges: "Zapisz zamiany",
                SavingError:
                    "Coś poszło nie tak podczas zapisywania ustawień wtyczki. Sprawdź konsolę, aby uzyskać więcej informacji",
                Settings: "Ustawienia",
                SetToNow: "Ustaw dzisiejszą datę",
                Subtract: "Odejmij",
                subtract: "odjęta od",
                Year: "Liczba lat",
                YearHelpText: "Liczba lat która powinna być {{addSub}} dzisiejszej daty w trakcie tworzenia obiektu",
            },
        },
    },
});

export default i18n;
