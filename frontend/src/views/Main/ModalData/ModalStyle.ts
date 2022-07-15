
 export const modalStyle: ReactModal.Styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(70,76,80,0.6)',
        justifyContent: 'center',
        display: 'flex'
    },
    content: {
        position: 'unset',
        top: '40px',
        left: '40px',
        right: '40px',
        bottom: '40px',
        border: '1px solid #ccc',
        background: '#fff',
        overflow: 'unset',
        WebkitOverflowScrolling: 'touch',
        borderRadius: '4px',
        outline: 'none',
        padding: '20px',
        height: 'fit-content',
        width: '30em',
        alignSelf: 'center'

    }
}