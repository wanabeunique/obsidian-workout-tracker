import { useContext } from "react";
import {AppContext} from "../../main";
import {App} from "obsidian";

export const useApp = (): App | undefined => {
	return useContext(AppContext);
};
