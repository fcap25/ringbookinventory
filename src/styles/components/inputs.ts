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
		border: "2px solid",
		borderColor: "primary.600",
		background: "primary.600",
		borderRadius: "xl",
		color: "white",
	},
})


export const inputStyles = defineMultiStyleConfig({
	variants: { search },
})

