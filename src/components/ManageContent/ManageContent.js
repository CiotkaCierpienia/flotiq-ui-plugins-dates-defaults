import { useCallback, useMemo, useState } from "react";
import { FieldArray, Form, Formik } from "formik";
import * as yup from "yup";
import SettingsField from "../SettingsField/SettingsField";
import { useTranslation } from "react-i18next";

const ManageContent = ({
                           plugin,
                           contentTypes,
                           reload,
                           modalInstance,
                           client,
                           toast,
                       }) => {
    const { t } = useTranslation();
    const formId = plugin.name;

    const [isSaving, setIsSaving] = useState(false);

    const ctdFieldsDict = useMemo(
        () =>
            (contentTypes || []).reduce((ctdFields, currentCtd) => {
                const fieldsDict = Object.entries(
                    currentCtd?.metaDefinition?.propertiesConfig || {}
                )
                    .filter(([, value]) => value?.inputType === "dateTime")
                    .map(([key]) => key);

                ctdFields[currentCtd.name] = fieldsDict;
                return ctdFields;
            }, {}),
        [contentTypes]
    );

    const validationSchema = useMemo(
        () =>
            yup.object().shape({
                settings: yup.array().of(
                    yup.object().shape({
                        content_type: yup.string().required(t("FieldRequired")),
                        date_field: yup
                            .string()
                            .required(t("FieldRequired"))
                            .test({
                                name: "date_field",
                                message: t("FieldNotFound"),
                                test: (value, context) =>
                                    ctdFieldsDict?.[context.parent.content_type]?.includes(value),
                            }),
                    })
                ),
            }),
        [ctdFieldsDict, t]
    );

    const onSubmit = useCallback(
        async (values) => {
            setIsSaving(true);

            try {
                const { body, status } = await client["_plugin_settings"].patch(
                    plugin.id,
                    { settings: JSON.stringify(values.settings) }
                );

                if (status < 200 || status >= 300) {
                    throw new Error(body);
                }

                toast.success(t("Saved"));
                reload();
                modalInstance.resolve();
            } catch (e) {
                toast.error(e.message || t("SavingError"));
            }

            setIsSaving(false);
        },
        [client, modalInstance, plugin.id, reload, toast, t]
    );

    return (
        <Formik
            initialValues={{ settings: JSON.parse(plugin.settings || "[]") }}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            validateOnChange
            validateOnBlur
        >
            <Form className="plugin-dates-defaults" id={formId} noValidate>
                <FieldArray name="settings">
                    {(arrayHelpers) => (
                        <SettingsField
                            arrayHelpers={arrayHelpers}
                            disabled={isSaving}
                            formId={formId}
                            contentTypes={contentTypes || []}
                            ctdFieldsDict={ctdFieldsDict}
                        />
                    )}
                </FieldArray>
            </Form>
        </Formik>
    );
};

export default ManageContent;
