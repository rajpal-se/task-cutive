import { getUserProfileApi } from "../apis";
import { toast } from "sonner";
import { setUserData, store } from "../store";

export async function getUserProfile() {
    try {
        const userProfile = await getUserProfileApi();
        // console.log("User Profile:", userProfile);
        store.dispatch(setUserData(userProfile));
        return userProfile;
    } catch (error) {
        toast.error(
            error instanceof Error
                ? error.message
                : "Failed to fetch user profile",
        );
        return null;
    }
}
