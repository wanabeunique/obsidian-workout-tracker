import { useContext } from "react";
import {AppContext} from "../../main";
import {App} from "obsidian";

export const useApp = (): App | null => {
	return useContext(AppContext);
};
