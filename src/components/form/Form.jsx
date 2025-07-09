import styles from './form.module.css';
export default function Form({ children, onSubmit, className }) {
    return (
        <form className={className} action={onSubmit}>
            {children}
        </form>
    );
}