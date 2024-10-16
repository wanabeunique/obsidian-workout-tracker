import { __awaiter } from "tslib";
import { PluginSettingTab, Setting } from "obsidian";
export const DEFAULT_SETTINGS = {
    exercisesFolder: 'Exercises',
    workoutsFolder: 'Workouts',
    additionalExerciseParams: [{
            name: 'Weight',
            type: 'string'
        },
        {
            name: 'Reps',
            type: 'number'
        }
    ]
};
export default class WorkoutSettingsTab extends PluginSettingTab {
    constructor(app, plugin) {
        super(app, plugin);
        this.plugin = plugin;
    }
    display() {
        const { containerEl } = this;
        containerEl.empty();
        new Setting(containerEl)
            .setName('Workouts Folder')
            .setDesc('The folder where workouts are stored')
            .addText(text => text
            .setPlaceholder('Enter the folder name')
            .setValue(this.plugin.settings.workoutsFolder)
            .onChange((value) => __awaiter(this, void 0, void 0, function* () {
            this.plugin.settings.workoutsFolder = value;
            yield this.plugin.saveSettings();
        })));
        new Setting(containerEl)
            .setName('Exercises Folder')
            .setDesc('The folder where exercises are stored')
            .addText(text => text
            .setPlaceholder('Enter the folder name')
            .setValue(this.plugin.settings.exercisesFolder)
            .onChange((value) => __awaiter(this, void 0, void 0, function* () {
            this.plugin.settings.exercisesFolder = value;
            yield this.plugin.saveSettings();
        })));
        new Setting(containerEl)
            .setName('Additional Exercise Parameters')
            .addButton(button => {
            button.setButtonText('Add Parameter');
            button.onClick(() => __awaiter(this, void 0, void 0, function* () {
                this.plugin.settings.additionalExerciseParams.push({
                    name: '',
                    type: ''
                });
                this.display();
                yield this.plugin.saveSettings();
            }));
        });
        this.plugin.settings.additionalExerciseParams.forEach((param, index) => {
            new Setting(containerEl)
                .setName(param.name)
                .setDesc('The type of the name')
                .addText(text => text
                .setPlaceholder('Enter the name')
                .setValue(param.name)
                .onChange((value) => __awaiter(this, void 0, void 0, function* () {
                this.plugin.settings.additionalExerciseParams[index].name = value;
                yield this.plugin.saveSettings();
            })))
                .addButton(button => {
                button.setButtonText('Remove Parameter')
                    .onClick(() => __awaiter(this, void 0, void 0, function* () {
                    this.plugin.settings.additionalExerciseParams.splice(index, 1);
                    this.display();
                    yield this.plugin.saveSettings();
                }));
            });
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzZXR0aW5ncy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFNLGdCQUFnQixFQUFFLE9BQU8sRUFBQyxNQUFNLFVBQVUsQ0FBQztBQU14RCxNQUFNLENBQUMsTUFBTSxnQkFBZ0IsR0FBMkI7SUFDdkQsZUFBZSxFQUFFLFdBQVc7SUFDNUIsY0FBYyxFQUFFLFVBQVU7SUFDMUIsd0JBQXdCLEVBQUUsQ0FBQztZQUN6QixJQUFJLEVBQUUsUUFBUTtZQUNkLElBQUksRUFBRSxRQUFRO1NBQ2Q7UUFDRDtZQUNDLElBQUksRUFBRSxNQUFNO1lBQ1osSUFBSSxFQUFFLFFBQVE7U0FDZDtLQUNEO0NBQ0QsQ0FBQTtBQUdELE1BQU0sQ0FBQyxPQUFPLE9BQU8sa0JBQW1CLFNBQVEsZ0JBQWdCO0lBRy9ELFlBQVksR0FBUSxFQUFFLE1BQWdCO1FBQ3JDLEtBQUssQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDbkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDdEIsQ0FBQztJQUVELE9BQU87UUFDTixNQUFNLEVBQUMsV0FBVyxFQUFDLEdBQUcsSUFBSSxDQUFDO1FBRTNCLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUVwQixJQUFJLE9BQU8sQ0FBQyxXQUFXLENBQUM7YUFDdEIsT0FBTyxDQUFDLGlCQUFpQixDQUFDO2FBQzFCLE9BQU8sQ0FBQyxzQ0FBc0MsQ0FBQzthQUMvQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJO2FBQ25CLGNBQWMsQ0FBQyx1QkFBdUIsQ0FBQzthQUN2QyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDO2FBQzdDLFFBQVEsQ0FBQyxDQUFPLEtBQUssRUFBRSxFQUFFO1lBQ3pCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7WUFDNUMsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ2xDLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQztRQUVOLElBQUksT0FBTyxDQUFDLFdBQVcsQ0FBQzthQUN0QixPQUFPLENBQUMsa0JBQWtCLENBQUM7YUFDM0IsT0FBTyxDQUFDLHVDQUF1QyxDQUFDO2FBQ2hELE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUk7YUFDbkIsY0FBYyxDQUFDLHVCQUF1QixDQUFDO2FBQ3ZDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUM7YUFDOUMsUUFBUSxDQUFDLENBQU8sS0FBSyxFQUFFLEVBQUU7WUFDekIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQztZQUM3QyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDbEMsQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFDO1FBRU4sSUFBSSxPQUFPLENBQUMsV0FBVyxDQUFDO2FBQ3RCLE9BQU8sQ0FBQyxnQ0FBZ0MsQ0FBQzthQUN6QyxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDbEIsTUFBTSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUN0QyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQVMsRUFBRTtnQkFDekIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDO29CQUNsRCxJQUFJLEVBQUUsRUFBRTtvQkFDUixJQUFJLEVBQUUsRUFBRTtpQkFDUixDQUFDLENBQUM7Z0JBQ0gsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUNmLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUNsQyxDQUFDLENBQUEsQ0FBQyxDQUFBO1FBQ0gsQ0FBQyxDQUFDLENBQUE7UUFFSixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyx3QkFBd0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEVBQUU7WUFDdEUsSUFBSSxPQUFPLENBQUMsV0FBVyxDQUFDO2lCQUN0QixPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztpQkFDbkIsT0FBTyxDQUFDLHNCQUFzQixDQUFDO2lCQUMvQixPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJO2lCQUNuQixjQUFjLENBQUMsZ0JBQWdCLENBQUM7aUJBQ2hDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO2lCQUNwQixRQUFRLENBQUMsQ0FBTyxLQUFLLEVBQUUsRUFBRTtnQkFDekIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsd0JBQXdCLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztnQkFDbEUsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQ2xDLENBQUMsQ0FBQSxDQUFDLENBQUM7aUJBQ0gsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUNuQixNQUFNLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDO3FCQUN0QyxPQUFPLENBQUMsR0FBUyxFQUFFO29CQUNuQixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyx3QkFBd0IsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUMvRCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7b0JBQ2YsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDO2dCQUNsQyxDQUFDLENBQUEsQ0FBQyxDQUFBO1lBQ0osQ0FBQyxDQUFDLENBQUE7UUFDSixDQUFDLENBQUMsQ0FBQTtJQUNILENBQUM7Q0FDRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QXBwLCBQbHVnaW5TZXR0aW5nVGFiLCBTZXR0aW5nfSBmcm9tIFwib2JzaWRpYW5cIjtcbmltcG9ydCBNeVBsdWdpbiBmcm9tIFwiLi4vLi4vbWFpblwiO1xuaW1wb3J0IHtXb3Jrb3V0VHJhY2tlclNldHRpbmdzfSBmcm9tIFwiLi9zZXR0aW5ncy50eXBlc1wiO1xuXG5cblxuZXhwb3J0IGNvbnN0IERFRkFVTFRfU0VUVElOR1M6IFdvcmtvdXRUcmFja2VyU2V0dGluZ3MgPSB7XG5cdGV4ZXJjaXNlc0ZvbGRlcjogJ0V4ZXJjaXNlcycsXG5cdHdvcmtvdXRzRm9sZGVyOiAnV29ya291dHMnLFxuXHRhZGRpdGlvbmFsRXhlcmNpc2VQYXJhbXM6IFt7XG5cdFx0XHRuYW1lOiAnV2VpZ2h0Jyxcblx0XHRcdHR5cGU6ICdzdHJpbmcnXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRuYW1lOiAnUmVwcycsXG5cdFx0XHR0eXBlOiAnbnVtYmVyJ1xuXHRcdH1cblx0XVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdvcmtvdXRTZXR0aW5nc1RhYiBleHRlbmRzIFBsdWdpblNldHRpbmdUYWIge1xuXHRwbHVnaW46IE15UGx1Z2luO1xuXG5cdGNvbnN0cnVjdG9yKGFwcDogQXBwLCBwbHVnaW46IE15UGx1Z2luKSB7XG5cdFx0c3VwZXIoYXBwLCBwbHVnaW4pO1xuXHRcdHRoaXMucGx1Z2luID0gcGx1Z2luO1xuXHR9XG5cblx0ZGlzcGxheSgpOiB2b2lkIHtcblx0XHRjb25zdCB7Y29udGFpbmVyRWx9ID0gdGhpcztcblxuXHRcdGNvbnRhaW5lckVsLmVtcHR5KCk7XG5cblx0XHRuZXcgU2V0dGluZyhjb250YWluZXJFbClcblx0XHRcdC5zZXROYW1lKCdXb3Jrb3V0cyBGb2xkZXInKVxuXHRcdFx0LnNldERlc2MoJ1RoZSBmb2xkZXIgd2hlcmUgd29ya291dHMgYXJlIHN0b3JlZCcpXG5cdFx0XHQuYWRkVGV4dCh0ZXh0ID0+IHRleHRcblx0XHRcdFx0LnNldFBsYWNlaG9sZGVyKCdFbnRlciB0aGUgZm9sZGVyIG5hbWUnKVxuXHRcdFx0XHQuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3Mud29ya291dHNGb2xkZXIpXG5cdFx0XHRcdC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcblx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zZXR0aW5ncy53b3Jrb3V0c0ZvbGRlciA9IHZhbHVlO1xuXHRcdFx0XHRcdGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuXHRcdFx0XHR9KSk7XG5cblx0XHRuZXcgU2V0dGluZyhjb250YWluZXJFbClcblx0XHRcdC5zZXROYW1lKCdFeGVyY2lzZXMgRm9sZGVyJylcblx0XHRcdC5zZXREZXNjKCdUaGUgZm9sZGVyIHdoZXJlIGV4ZXJjaXNlcyBhcmUgc3RvcmVkJylcblx0XHRcdC5hZGRUZXh0KHRleHQgPT4gdGV4dFxuXHRcdFx0XHQuc2V0UGxhY2Vob2xkZXIoJ0VudGVyIHRoZSBmb2xkZXIgbmFtZScpXG5cdFx0XHRcdC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5leGVyY2lzZXNGb2xkZXIpXG5cdFx0XHRcdC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcblx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zZXR0aW5ncy5leGVyY2lzZXNGb2xkZXIgPSB2YWx1ZTtcblx0XHRcdFx0XHRhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcblx0XHRcdFx0fSkpO1xuXG5cdFx0bmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG5cdFx0XHQuc2V0TmFtZSgnQWRkaXRpb25hbCBFeGVyY2lzZSBQYXJhbWV0ZXJzJylcblx0XHRcdC5hZGRCdXR0b24oYnV0dG9uID0+IHtcblx0XHRcdFx0XHRidXR0b24uc2V0QnV0dG9uVGV4dCgnQWRkIFBhcmFtZXRlcicpO1xuXHRcdFx0XHRcdGJ1dHRvbi5vbkNsaWNrKGFzeW5jICgpID0+IHtcblx0XHRcdFx0XHRcdHRoaXMucGx1Z2luLnNldHRpbmdzLmFkZGl0aW9uYWxFeGVyY2lzZVBhcmFtcy5wdXNoKHtcblx0XHRcdFx0XHRcdFx0bmFtZTogJycsXG5cdFx0XHRcdFx0XHRcdHR5cGU6ICcnXG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdHRoaXMuZGlzcGxheSgpO1xuXHRcdFx0XHRcdFx0YXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0fSlcblxuXHRcdHRoaXMucGx1Z2luLnNldHRpbmdzLmFkZGl0aW9uYWxFeGVyY2lzZVBhcmFtcy5mb3JFYWNoKChwYXJhbSwgaW5kZXgpID0+IHtcblx0XHRcdG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuXHRcdFx0XHQuc2V0TmFtZShwYXJhbS5uYW1lKVxuXHRcdFx0XHQuc2V0RGVzYygnVGhlIHR5cGUgb2YgdGhlIG5hbWUnKVxuXHRcdFx0XHQuYWRkVGV4dCh0ZXh0ID0+IHRleHRcblx0XHRcdFx0XHQuc2V0UGxhY2Vob2xkZXIoJ0VudGVyIHRoZSBuYW1lJylcblx0XHRcdFx0XHQuc2V0VmFsdWUocGFyYW0ubmFtZSlcblx0XHRcdFx0XHQub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XG5cdFx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zZXR0aW5ncy5hZGRpdGlvbmFsRXhlcmNpc2VQYXJhbXNbaW5kZXhdLm5hbWUgPSB2YWx1ZTtcblx0XHRcdFx0XHRcdGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuXHRcdFx0XHRcdH0pKVxuXHRcdFx0XHQuYWRkQnV0dG9uKGJ1dHRvbiA9PiB7XG5cdFx0XHRcdFx0YnV0dG9uLnNldEJ1dHRvblRleHQoJ1JlbW92ZSBQYXJhbWV0ZXInKVxuXHRcdFx0XHRcdFx0Lm9uQ2xpY2soYXN5bmMgKCkgPT4ge1xuXHRcdFx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zZXR0aW5ncy5hZGRpdGlvbmFsRXhlcmNpc2VQYXJhbXMuc3BsaWNlKGluZGV4LCAxKTtcblx0XHRcdFx0XHRcdFx0dGhpcy5kaXNwbGF5KCk7XG5cdFx0XHRcdFx0XHRcdGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuXHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0fSlcblx0XHR9KVxuXHR9XG59XG4iXX0=