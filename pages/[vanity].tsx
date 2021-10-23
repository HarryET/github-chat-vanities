import { GetServerSidePropsContext } from "next";
import { vanityForUrl } from "service/supabase";
import { ChatVanity, UserVanity } from "types";

export default function RedirectToVanity() {
    return null;
}

export const getServerSideProps = async (
    context: GetServerSidePropsContext<{ vanity: string }>
): Promise<{
    redirect: {
        destination: string;
        permanent: boolean;
    };
}> => {
    const { vanity } = context.params || {};
    if (!vanity)
        return {
            redirect: {
                destination: "https://github-chat.com/?error=Invalid%20Vanity%20URL",
                permanent: false,
            },
        };

    const { data: rawVanityData } = await vanityForUrl(vanity);

    if (!rawVanityData) {
        return {
            redirect: {
                destination: "https://github-chat.com/?error=Invalid%20Vanity%20URL",
                permanent: false,
            },
        };
    }

    const vanityData = rawVanityData[0];

    if (vanityData.type == UserVanity) {
        return {
            redirect: {
                destination: `https://github-chat.com/users/${vanityData.redirect_to}`,
                permanent: false,
            },
        };
    } 
    
    if (vanityData.type == ChatVanity) {
        return {
            redirect: {
                destination: `https://github-chat.com/chats/${vanityData.redirect_to}`,
                permanent: false,
            },
        };
    }

    return {
        redirect: {
            destination: "https://github-chat.com/?error=Invalid%20Vanity%20URL",
            permanent: false,
        },
    };
}