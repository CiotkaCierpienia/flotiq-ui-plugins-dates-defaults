import { useCallback, useMemo, useState } from 'react';
import { Field, getIn, useFormikContext } from "formik";
import { useTranslation } from "react-i18next";
import Button from "../../Button/Button";
import { DeleteIcon } from "../../../images/shapes";
import Dropdown from "../../Dropdown/Dropdown";
import Input from '../../Input/Input';

const SettingsItem = ({
                          onDelete,
                          disabled,
                          idx,
                          contentTypes,
                          ctdFieldsDict,
                      }) => {
    const formik = useFormikContext();
    const { t } = useTranslation();


    const [selectedType, setSelectedType] = useState(
        getIn(formik.values, `settings[${idx}].content_type`) || ""
    );
    const [addSub, setAddSub] = useState(
        getIn(formik.values, `settings[${idx}].add_sub`) || ""
    );

    const showAddSubtractValues = useMemo(
        () => addSub !== 'now',
        [addSub]
    );

    const onContentTypeChange = useCallback(
        (e) => {
            const ctdName = e.target.value;
            formik.handleChange(e);

            setSelectedType((prevCtd) => {
                if (prevCtd !== ctdName) {
                    formik.setFieldValue(`settings[${idx}].date_field`, "");
                }
                return ctdName;
            });
        },
        [formik, idx]
    );

    const onAddSubChange = useCallback(
        (e) => {
            const _addSub = e.target.value;
            formik.handleChange(e);

            setAddSub(_addSub);
        },
        [formik]
    );

    return (
        <div className="settings-field">
            <div className="delete">
                <Button
                    color="borderless"
                    onClick={() => onDelete(idx)}
                    disabled={disabled}
                    type="button"
                >
                    <DeleteIcon />
                </Button>
            </div>
            <div className="inputs">
                <Dropdown
                    name={`settings[${idx}].content_type`}
                    options={contentTypes
                        .filter(({ internal }) => !internal)
                        .map(({ name, label }) => ({ value: name, label }))}
                    value={formik.values.settings[idx].content_type}
                    onChange={onContentTypeChange}
                    onBlur={formik.handleBlur}
                    label={t("ContentType")}
                    disabled={disabled}
                    emptyText={t("NoContentTypes")}
                    search
                />

                <Field name={`settings[${idx}].date_field`}>
                    {({ field, meta }) => {
                        return (
                            <Dropdown
                                name={field.name}
                                options={(ctdFieldsDict[selectedType] || []).map((key) => ({
                                    value: key,
                                    label: key,
                                }))}
                                value={field.value}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                                label={t("DateField")}
                                disabled={disabled}
                                emptyText={t("NoFields")}
                                helpText={t("DateFieldHelpText")}
                                error={meta.touched && meta.error}
                            />
                        );
                    }}
                </Field>

                <Field name={`settings[${idx}].add_sub`}>
                    {({ field, meta }) => {
                        return (
                            <Dropdown
                                name={field.name}
                                options={[{
                                    value: 'now',
                                    label: t('SetToNow'),
                                },{
                                    value: 'add',
                                    label: t('Add'),
                                },{
                                    value: 'subtract',
                                    label: t('Subtract'),
                                }]}
                                value={field.value}
                                onChange={onAddSubChange}
                                onBlur={field.onBlur}
                                label={t("AddSub")}
                                disabled={disabled}
                                emptyText={t("NoFields")}
                                helpText={t("AddSubHelpText")}
                                error={meta.touched && meta.error}
                            />
                        );
                    }}
                </Field>

                {showAddSubtractValues && (<Field name={`settings[${idx}].year`}>
                    {({ field, meta }) => {
                        return (
                            <Input
                                name={field.name}
                                value={field.value}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                                type="number"
                                label={t("Year")}
                                emptyText={t("NoFields")}
                                helpText={t("YearHelpText", {addSub: t(addSub)})}
                                error={meta.touched && meta.error}
                                min={0}
                            />
                        );
                    }}
                </Field>)}

                {showAddSubtractValues && (<Field name={`settings[${idx}].month`}>
                    {({ field, meta }) => {
                        return (
                            <Input
                                name={field.name}
                                value={field.value}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                                type="number"
                                label={t("Month")}
                                emptyText={t("NoFields")}
                                helpText={t("MonthHelpText", {addSub: t(addSub)})}
                                error={meta.touched && meta.error}
                                min={0}
                            />
                        );
                    }}
                </Field>)}

                {showAddSubtractValues && (<Field name={`settings[${idx}].day`}>
                    {({ field, meta }) => {
                        return (
                            <Input
                                name={field.name}
                                value={field.value}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                                type="number"
                                label={t("Day")}
                                emptyText={t("NoFields")}
                                helpText={t("DayHelpText", {addSub: t(addSub)})}
                                error={meta.touched && meta.error}
                                min={0}
                            />
                        );
                    }}
                </Field>)}

                {showAddSubtractValues && (<Field name={`settings[${idx}].hour`}>
                    {({ field, meta }) => {
                        return (
                            <Input
                                name={field.name}
                                value={field.value}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                                type="number"
                                label={t("Hour")}
                                emptyText={t("NoFields")}
                                helpText={t("HourHelpText", {addSub: t(addSub)})}
                                error={meta.touched && meta.error}
                                min={0}
                            />
                        );
                    }}
                </Field>)}

                {showAddSubtractValues && (<Field name={`settings[${idx}].minute`}>
                    {({ field, meta }) => {
                        return (
                            <Input
                                name={field.name}
                                value={field.value}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                                type="number"
                                label={t("Minute")}
                                emptyText={t("NoFields")}
                                helpText={t("MinuteHelpText", {addSub: t(addSub)})}
                                error={meta.touched && meta.error}
                                min={0}
                            />
                        );
                    }}
                </Field>)}
            </div>
        </div>
    );
};

export default SettingsItem;
