import '@/app/features.css';
import CollabForm from '@/components/shared/CollabForm';

export default function CollaboratePage() {
    return (
        <section style={{ marginTop: '40px' }}>
            <div className="container">
                <CollabForm />
            </div>
        </section>
    );
}
