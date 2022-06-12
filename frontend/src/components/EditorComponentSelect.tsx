import { ChevronRightIcon, TrashIcon } from "@heroicons/react/outline";
import { useState } from "react";
import { ComponentSelectMenu } from "../discord/types";
import useMessage from "../hooks/useMessage";
import EditorComponentSelectOption from "./EditorComponentSelectOption";
import StyledInput from "./StyledInput";

interface Props {
  index: number;
  rowIndex: number;
  selectMenu: ComponentSelectMenu;
}

export default function EditorComponentSelect({
  index,
  rowIndex,
  selectMenu,
}: Props) {
  const [, dispatch] = useMessage();
  const [optionsCollapsed, setOptionsCollapsed] = useState(false);

  return (
    <div className="space-y-4 mt-3">
      <StyledInput
        className="flex-auto"
        type="text"
        label="Placeholder"
        maxLength={150}
        value={selectMenu.placeholder || ""}
        onChange={(value) =>
          dispatch({ type: "setSelectMenuPlaceholder", index, rowIndex, value })
        }
      />
      <div>
        <div
          className="text-medium flex-auto cursor-pointer flex items-center space-x-2 text-gray-300 select-none"
          onClick={() => setOptionsCollapsed(!optionsCollapsed)}
        >
          <ChevronRightIcon
            className={`h-5 w-5 transition-transform duration-300 ${
              optionsCollapsed ? "" : "rotate-90"
            }`}
          />
          <div>Options</div>
        </div>
        {!optionsCollapsed && (
          <div className="mt-3">
            {selectMenu.options.map((option, i) => (
              <EditorComponentSelectOption
                selectMenu={selectMenu}
                option={option}
                rowIndex={rowIndex}
                selectIndex={index}
                index={i}
                key={option.id}
              />
            ))}
            <div className="space-x-3 mt-3">
              {selectMenu.options.length < 25 ? (
                <button
                  className="bg-blurple px-3 py-2 rounded transition-colors hover:bg-blurple-dark"
                  onClick={() =>
                    dispatch({
                      type: "addSelectMenuOption",
                      rowIndex,
                      index,
                    })
                  }
                >
                  Add Option
                </button>
              ) : (
                <button
                  disabled
                  className="bg-dark-2 px-3 py-2 rounded transition-colors cursor-not-allowed text-gray-300"
                >
                  Add Option
                </button>
              )}
              <button
                className="px-3 py-2 rounded border-2 border-red hover:bg-red transition-colors"
                onClick={() =>
                  dispatch({
                    type: "clearSelectMenuOptions",
                    rowIndex,
                    index,
                  })
                }
              >
                Clear Options
              </button>
            </div>
          </div>
        )}
        <div className="mt-2 text-xs text-red">
          Select Menus do currently not show up in the preview
        </div>
      </div>
    </div>
  );
}
