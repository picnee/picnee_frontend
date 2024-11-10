import LocationCard from "@/app/components/common/LocationCard";

const LocationBox = () => {
  return (
    <article className="flex justify-between gap-3">
      <LocationCard location="도쿄" />
      <LocationCard location="오사카" />
      <LocationCard location="후쿠오카" />
      <LocationCard location="훗카이도" />
    </article>
  );
};

export default LocationBox;
