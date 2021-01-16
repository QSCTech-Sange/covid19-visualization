import dynamic from 'next/dynamic';

const ClientTopTen = dynamic(() => import('components/TopTen'), { ssr: false });

export default function TopTenTest() {
    return (
        <div style={{ height: '800px' }}>
            <ClientTopTen />
        </div>
    );
}