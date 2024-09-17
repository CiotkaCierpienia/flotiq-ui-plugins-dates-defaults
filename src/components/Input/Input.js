const Input = ({ type, label, helpText, error, ...props }) => {
    return (
        <div>
            <label>{ label }</label>
            <input type={type} {...props} />
            {helpText && <div className="help-text">{helpText}</div>}
            {error && <div className="error-text">{error}</div>}
        </div>
    );
};

export default Input;
