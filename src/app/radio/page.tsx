import PodcastComponent from "../../components/PodcastsComponent";
import useAuth from "@/hooks/useAuth";

export default function Radio() {
  useAuth();
  // useAuth is called to ensure that the user is authenticated before rendering the component

  return (
    <>
      <PodcastComponent />
    </>
  );
}
