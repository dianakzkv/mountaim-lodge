import { useController } from "react-hook-form";
import Select from "./Select";

const ControlledSelect = ({ name, control, options, ...rest }) => {
	const {
		field: { onChange, onBlur, value, ref },
	} = useController({
		name,
		control,
		rules: { required: "This field is required" },
	});

	return (
		<Select
			ref={ref}
			options={options}
			value={value}
			onChange={onChange}
			onBlur={onBlur}
			{...rest}
		/>
	);
};

export default ControlledSelect;
