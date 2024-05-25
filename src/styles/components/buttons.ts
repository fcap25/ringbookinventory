import { ComponentStyleConfig } from "@chakra-ui/react";
import colors from "../theme/colors";

const buttonStyles: ComponentStyleConfig = {
	defaultProps: {colorScheme: "none"},
	baseStyle: {
		variant: "unstyled",
		transition: "all 0.5s",
		bgGradient: `linear-gradient(0deg, ${colors.primary[500]} 35%, ${colors.primary[600]} 100%)`,
		color: 'white',
		boxShadow: "lg",
		borderRadius: "lg",
		_hover: {
			transform: "translateY(3px)",
		},
	},
	variants: {
		"with-shadow": {
			bgColor: "orange",
			color: 'white',
			boxShadow: "0 0 2px 2px #efdfde",
		},
	},
};

export default buttonStyles;