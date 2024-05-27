import { selectAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(selectAnatomy.keys)

  const baseStyle = definePartsStyle({
	// define the part you're going to style
	field: {
		border: "2px solid",
		borderColor: "primary.600",
		background: "primary.100",
		borderRadius: "full",
		color: "gray.500",
	},
	icon: {
	  color: 'gray.400',
	},
  })

export const selectStyles = defineMultiStyleConfig({
	  baseStyle,
})