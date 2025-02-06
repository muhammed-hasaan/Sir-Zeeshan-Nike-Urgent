const Button = ({
  children,
  style,
  classname,
  title,
  onClick,
  htmlType,
  disabled,
}) => {
  return (
    <button
      disabled={disabled}
      style={style}
      title={title}
      className={`btn ${classname}`}
      onClick={onClick}
      type={htmlType}
    >
      {children}
    </button>
  );
};

export default Button;
