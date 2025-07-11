export default function Form({ children, onSubmit, className }) {
    return (
        <form className={className} action={onSubmit}>
            {children}
        </form>
    );
}