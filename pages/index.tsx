export default function RedirectToMainSite() {
    return null;
}

export const getServerSideProps = async (): Promise<{
    redirect: {
        destination: string;
        permanent: boolean;
    };
}> => {
    return {
        redirect: {
            destination: "https://github-chat.com",
            permanent: true
        }
    }
}