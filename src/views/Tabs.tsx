import { Dispatch, SetStateAction } from "react";

interface TabsProps {
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="border my-2 mx-5 p-4 flex justify-around rounded-md">
      <a
        onClick={() => setActiveTab("background")}
        className={activeTab == "background" ? "text-yellow-500 tab" : "tab"}
      >
        Background
      </a>
      <a
        onClick={() => setActiveTab("abilities")}
        className={activeTab == "abilities" ? "text-yellow-500 tab" : "tab"}
      >
        Abilities
      </a>
      <a
        onClick={() => setActiveTab("classes")}
        className={activeTab == "classes" ? "text-yellow-500 tab" : "tab"}
      >
        Classes
      </a>
      <a
        onClick={() => setActiveTab("spells")}
        className={activeTab == "spells" ? "text-yellow-500 tab" : "tab"}
      >
        Spells
      </a>
      <a
        onClick={() => setActiveTab("items")}
        className={activeTab == "items" ? "text-yellow-500 tab" : "tab"}
      >
        Items
      </a>
    </div>
  );
};

export default Tabs;
