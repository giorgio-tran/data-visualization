const Heading = ({
    title,
}: {
    title: string;
}) => {
    return (
        <div className="bg-seafoam pt-3">
            <div className="flex justify-center">
                <h1 className="mb-1 font-bold text-[2rem] text-center md:text-left">
                    {title}
                </h1>
            </div>
        </div>
    );
};

export default Heading;