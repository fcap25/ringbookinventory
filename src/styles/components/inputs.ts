import { inputAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'


const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys)

const search = definePartsStyle({
	field: {
		border: "2px solid",
		borderColor: "primary.600",
		background: "primary.100",
		borderRadius: "full",
	},
	addon: {
	clearButton: {
		color: "primary.500",
		_hover: {
			color: "primary.600",
		},
	},
	},
})


export const inputStyles = defineMultiStyleConfig({
	variants: { search },
})

