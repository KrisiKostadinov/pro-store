import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      <Image src={"/loading.gif"} alt="Loading..." width={150} height={150} />
    </div>
  );
}
