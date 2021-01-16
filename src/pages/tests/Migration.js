import Migration from 'components/Migration'

// import dynamic from "next/dynamic";
// const Migration = dynamic(() => import("../../components/Migration"), { ssr: false });

export default function MigrationTest() {
    return (
        <Migration info="test" />
    );
}