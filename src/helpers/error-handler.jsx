export const errorHandler = (error, setFlashMessage) => {
    if (error.response.data.errors) {
        setFlashMessage('Preencha os campos obrigatórios', 'danger')
    } else {
        setFlashMessage(error.response.data.message, 'danger')
    }
}