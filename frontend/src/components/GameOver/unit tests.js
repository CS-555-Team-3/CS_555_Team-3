test('Pasting fires onPaste event which returns clipboard data', () => {
    const pasted = jest.fn(() => null);
    const changed = jest.fn(() => null);
  
    render(
      <PasteComponent paste={pasted} changeEvent={changed} data-testid='paste-input' />);
  
    const PhoneNumberElement = screen.queryByTestId('paste-input');
  
    const paste = createEvent.paste(PhoneNumberElement, {
      clipboardData: {
        getData: () => '123456',
      },
    });
  
    fireEvent(PhoneNumberElement, paste);
  
    expect(pasted).toHaveBeenCalled();
    expect(pasted).toHaveBeenCalledWith('123456');
  });