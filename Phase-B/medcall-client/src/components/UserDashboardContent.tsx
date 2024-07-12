import Button from "../components/Button";

const UserDashboardContent = () => {
  return (
    <>
      <div className="flex flex-row gap-4 w-full h-full">
        <div
          className="left-side"
          style={{ width: 300, background: "#f0f0f0" }}
        >
          {/* check condition here */}
          {/* {noActiveRequest()} */}

          <section className="py-4 flex justify-center items-center">
            <div className="flex py-8 justify-start text-center flex-col gap-8 bg-modalBackground rounded-2xl w-full h-fit min-h-[250px] shadow-xl">
              <h2 className="text-3xl font-bold">Request New Ambulance</h2>
              <div className="flex flex-col justify-center items-center gap-4">
                <h5 className="text-xl">
                  Request new ambulance for your
                  <br />
                  emergency and save life
                </h5>
                <Button
                  text="Order Now"
                  type="primary"
                  onClick={() => { }}
                  customClassName="text-2xl bg-red-700 hover:bg-red-800 text-white"
                />
              </div>
            </div>
          </section>
        </div>
        <div className="right-side" style={{ width: 700 }}>
          {/* Right Side Content */}
          <section className="flex justify-center items-center">
            <div className="flex py-8 justify-start text-start flex-col gap-8 bg-modalBackground rounded-2xl w-full h-fit min-h-[554px] shadow-xl">
              <h2 className="text-3xl font-bold ml-[10px]">History</h2>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};


export default UserDashboardContent;
