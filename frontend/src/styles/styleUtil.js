const colors = {
    control: styles => ({ ...styles, color: 'black' }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        color: "black"
      };
    },
  };

export {
    colors
};