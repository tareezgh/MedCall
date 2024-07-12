import { useSelector } from "react-redux";
import Button from "../components/Button";
import UserDashboardContent from "./UserDashboardContent";
// import UserDashboardContent from "../components/UserDashboardContent";
// import { useTranslation } from "react-i18next";
// TODO: the plus icon for 'New Request'
// import { PlusIcon } from "../components/icons";

interface DashboardContentProps { }
// const { t } = useTranslation();

const DashboardContent = ({ }: DashboardContentProps) => {
  const currentUser = useSelector((state: any) => state.currentUser);

  const getWidths = () => {
    switch (currentUser.role) {
      case "admin":
        return { leftWidth: 30, rightWidth: 70 };
      case "user":
        return { leftWidth: 50, rightWidth: 50 };
      case "driver":
        return { leftWidth: 70, rightWidth: 30 };
      default:
        return { leftWidth: 50, rightWidth: 50 };
    }
  };

  const renderSomething = () => {
    switch (currentUser.role) {
      case "admin":
        return { leftWidth: 30, rightWidth: 70 };
      case "user":
        return <UserDashboardContent/>
      case "driver":
        return { leftWidth: 70, rightWidth: 30 };
      default:
        return { leftWidth: 50, rightWidth: 50 };
    }
  };

  const { leftWidth, rightWidth } = getWidths();

  const noActiveRequest = () => {
    return (
      <>
      </>
    );
  };

  const activeRequest = () => {
    return (
      <>
        <section className="flex justify-center items-center">
          <div className="flex py-8 justify-start text-center flex-col gap-8 bg-modalBackground rounded-2xl w-full h-fit min-h-[250px] shadow-xl">
            <h2 className="text-3xl font-bold">Active Requests</h2>
            <div className="flex flex-col justify-center items-center gap-4">
              <h5 className="text-xl">The ambulance in his way, you can track it's route.</h5>
              {/* //TODO print accident type 
              */}
              <h5 className="text-xl font-bold">Accident</h5>
              <Button
                text='Track Now'
                type="primary"
                onClick={() => { }}
                customClassName="text-2xl bg-green-600 hover:bg-green-700 text-white"
              />
            </div>
          </div>
        </section></>
    );
  };

  return (
    <>
      <div className="flex flex-col items-start w-full gap-4">
        <h1 className="text-4xl w-full text-start">
          Welcome {`${currentUser.firstName}`}
        </h1>
        <div className="flex flex-row gap-4 w-full h-full">
          <div
            className="left-side"
            style={{ width: `${leftWidth}%`, background: "#f0f0f0" }}
          >
            {/* check condition here */}
            {renderSomething()}

            {/* <section className="py-4 flex justify-center items-center">
              <div className="flex py-8 justify-start text-center flex-col gap-8 bg-modalBackground rounded-2xl w-full h-fit min-h-[250px] shadow-xl">
                <h2 className="text-3xl font-bold">Request New Ambulance</h2>
                <div className="flex flex-col justify-center items-center gap-4">
                  <h5 className="text-xl">Request new ambulance for your<br />emergency and save life</h5>
                  <Button
                    text='Order Now'
                    type="primary"
                    onClick={() => { }}
                    customClassName="text-2xl bg-red-700 hover:bg-red-800 text-white"
                  />
                </div>
              </div>
            </section> */}

          </div>
          {/* <div
            className="right-side"
            style={{ width: `${rightWidth}%` }}
          >
            <section className="flex justify-center items-center">
              <div className="flex py-8 justify-start text-start flex-col gap-8 bg-modalBackground rounded-2xl w-full h-fit min-h-[554px] shadow-xl">
                <h2 className="text-3xl font-bold ml-[10px]">History</h2>
              </div>
            </section>

          </div> */}
        </div>
      </div>
    </>
  );

};

export default DashboardContent;
