# Zonzon's project management

> The French version of this README is available [here](https://github.com/rifts-obsidian-laboratory/plugin-zonzons-project-management/blob/main/README.md).

Zonzon's project management is a desktop plugin that adds a project creation and management system supporting both traditional and agile methodologies. It allows you to create projects with an overview file (`.md`), a dashboard (`.base`), and two dedicated folders for epics and user stories when using an agile project management approach.

## Installation

The plugin can be installed from the Obsidian Community Plugins marketplace, just like any other plugin.

Alternatively, you can download the `zonzons-project-management` compressed folder from the latest release available on the project's GitHub repository. Once downloaded, extract the archive and move the extracted folder into the `plugin/` folder of your Obsidian vault. Then refresh or restart Obsidian to make the plugin appear and enable it.

## Getting Started

Getting started with Zonzon's project management is done entirely through the plugin's settings. These settings are divided into four sections:

- General;
- Traditional project management;
- Agile project management;
- Saved projects.

The settings described in this section are not exhaustive; there are more features to discover. :3

### General

#### Project Folder

To use the plugin, you first need to select the folder where your projects will be stored using the "**Project folder path**" setting.

#### Project Overview File

Zonzon's project management also allows you to automatically create an overview file (in `.md` format) for each new project. To use this feature, you need to specify both the file name and the template to use when generating the file in the appropriate fields.

The two relevant settings are "**Project overview file name**" and "**Project overview template path**".

### Traditional Project Management

#### Dashboard

For each new project using traditional project management, you can automatically create a dashboard file (in `.base` format). To use this feature, you need to specify both the file name and the template to use when generating the file in the appropriate fields.

The two relevant settings are "**Dashboard file name**" and "**Dashboard template path**".

### Agile Project Management

#### Dashboard

For each new project using agile project management, you can automatically create a dashboard file (in `.base` format). To use this feature, you need to specify both the file name and the template to use when generating the file in the appropriate fields.

The two relevant settings are "**Dashboard file name**" and "**Dashboard template path**".

#### Epics

As part of agile project management, Zonzon's project management makes it easy to create epics.

To use this feature, you need to select the folder where a project's epics will be stored using the "**Epics folder name**" setting.

You can also specify a template to use when generating epics through the "**Epic template path**" setting.

#### User Stories

As part of agile project management, Zonzon's project management makes it easy to create user stories.

To use this feature, you need to select the folder where a project's user stories will be stored using the "**User stories folder name**" setting.

You can also specify a template to use when generating user stories through the "**User story template path**" setting.

### Saved Projects

To keep track of each project's type (agile or traditional), projects are saved and displayed in this section of the settings.

Each entry in the list represents a project and allows you to change its project management type or delete it. To prevent accidental deletions, a confirmation modal will appear before a project is deleted.

## License & Additional Information

This project is released under the MIT License.

Thank you for reading this far! I developed this plugin in just a few days to meet a personal need. I decided to make it publicly available because you might find it useful too.

Feel free to suggest new features or report any bugs you encounter. However, I cannot guarantee that suggested features will be implemented, as this plugin is primarily intended to meet my own needs.

I hope Zonzon's project management proves useful to you!
