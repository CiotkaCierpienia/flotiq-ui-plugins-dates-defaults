import moment from 'moment';

const handleCoForm = (
    { name, value, config, formik, isEditing },
    defaultDatesSettings,
) => {
    if (config.type !== 'date' && config.type !== 'datetime-local') return;
    if (value) return;

    const dateFieldSettings = defaultDatesSettings
        .filter(({ date_field }) => date_field === name);

    if (!isEditing && dateFieldSettings.length) {
        dateFieldSettings.forEach((field) => {

            if (formik.values[field.date_field]) return;

            const newValue = moment();
            if (field.add_sub !== 'now') {
                if (field.add_sub === 'add') {
                    newValue
                        .add(field.year, 'years')
                        .add(field.month, 'months')
                        .add(field.day, 'days');
                    if(config.type === 'datetime-local') {
                        newValue.add(field.hour, 'hours')
                            .add(field.minute, 'minutes');
                    }
                }
                if (field.add_sub === 'subtract') {
                    newValue
                        .subtract(field.year, 'years')
                        .subtract(field.month, 'months')
                        .subtract(field.day, 'days');
                    if(config.type === 'datetime-local') {
                        newValue.subtract(field.hour, 'hours')
                            .subtract(field.minute, 'minutes');
                    }
                }
            }
            formik.setFieldValue(
                field.date_field,
                newValue.format(config.type === 'date' ? 'YYYY-MM-DD' : 'YYYY-MM-DDTHH:mm')
            );
        });
    }
};

export function handleFormFieldConfig(
    { contentType, userPlugins, config, ...data },
    pluginInfo
) {
    if (!config) return;

    const defaultDatesSettings = JSON.parse(
        userPlugins?.find(({ id }) => id === pluginInfo.id)?.settings || "[]"
    )?.filter(({ content_type }) => content_type === contentType.name);

    if (defaultDatesSettings?.length > 0)
        return handleCoForm(
            { contentType, config, ...data },
            defaultDatesSettings,
        );

    return null;
}
