import { __awaiter } from "tslib";
import { Modal } from "obsidian";
import { createRoot } from "react-dom/client";
export class addWorkout extends Modal {
    constructor(app) {
        super(app);
        this.root = null;
        this.setTitle('Workout Tracker');
    }
    onOpen() {
        return __awaiter(this, void 0, void 0, function* () {
            this.root = createRoot(this.containerEl.children[1]);
            this.root.render(/ >););
        });
    }
    onClose() {
        const { contentEl } = this;
        contentEl.empty();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkV29ya291dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFkZFdvcmtvdXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBTSxLQUFLLEVBQVUsTUFBTSxVQUFVLENBQUM7QUFDN0MsT0FBTyxFQUFDLFVBQVUsRUFBTyxNQUFNLGtCQUFrQixDQUFDO0FBR2xELE1BQU0sT0FBTyxVQUFXLFNBQVEsS0FBSztJQUdwQyxZQUFZLEdBQVE7UUFDbkIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBSFosU0FBSSxHQUFnQixJQUFJLENBQUE7UUFJdkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFSyxNQUFNOztZQUNYLElBQUksQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckQsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQVksS0FBSyxDQUFBLENBQUE7UUFDbEMsQ0FBQztLQUFBO0lBRUQsT0FBTztRQUNOLE1BQU0sRUFBQyxTQUFTLEVBQUMsR0FBRyxJQUFJLENBQUM7UUFDekIsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ25CLENBQUM7Q0FDRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QXBwLCBNb2RhbCwgU2V0dGluZ30gZnJvbSBcIm9ic2lkaWFuXCI7XG5pbXBvcnQge2NyZWF0ZVJvb3QsIFJvb3R9IGZyb20gXCJyZWFjdC1kb20vY2xpZW50XCI7XG5pbXBvcnQge1JlYWN0Vmlld30gZnJvbSBcIi4vc3JjL2NvbXBvbmVudHMvUmVhY3RWaWV3XCI7XG5cbmV4cG9ydCBjbGFzcyBhZGRXb3Jrb3V0IGV4dGVuZHMgTW9kYWwge1xuXHRyb290OiBSb290IHwgbnVsbCA9IG51bGxcblxuXHRjb25zdHJ1Y3RvcihhcHA6IEFwcCkge1xuXHRcdHN1cGVyKGFwcCk7XG5cdFx0dGhpcy5zZXRUaXRsZSgnV29ya291dCBUcmFja2VyJyk7XG5cdH1cblxuXHRhc3luYyBvbk9wZW4oKSB7XG5cdFx0dGhpcy5yb290ID0gY3JlYXRlUm9vdCh0aGlzLmNvbnRhaW5lckVsLmNoaWxkcmVuWzFdKTtcblx0XHR0aGlzLnJvb3QucmVuZGVyKDxSZWFjdFZpZXcgLyA+KTtcblx0fVxuXG5cdG9uQ2xvc2UoKSB7XG5cdFx0Y29uc3Qge2NvbnRlbnRFbH0gPSB0aGlzO1xuXHRcdGNvbnRlbnRFbC5lbXB0eSgpO1xuXHR9XG59XG4iXX0=