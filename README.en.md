# Zonzon's project management

> La version française de ce *README* est disponible [ici (lien externe vers GitHub)](https://github.com/rifts-obsidian-laboratory/plugin-zonzons-project-management/blob/main/README.md).

Zonzon's project management is a desktop plugin that adds a project creation and management system supporting both traditional and agile methodologies. It allows you to create projects with an overview file (`.md`), a dashboard (`.base`), and two dedicated folders for epics and user stories when using an agile project management approach.

## Installation

The plugin can be installed from the Obsidian Community Plugins marketplace, just like any other plugin.

Alternatively, you can download the `zonzons-project-management` compressed folder from the latest release available on the project's GitHub repository. Once downloaded, extract the archive and move the extracted folder into the `plugin/` folder of your Obsidian vault. Then refresh or restart Obsidian to make the plugin appear and enable it.

## Getting Started

Getting started with Zonzon's project management is done through the plugin's settings and the templates you will use. These settings are divided into several sections:

- General;
- Traditional project management;
- Agile project management;
- Content identifiers ;
- Content links.

The settings described in this section are not exhaustive; there are more features to discover. :3

### General

#### Project Folder

To use the plugin, you first need to select the folder where your projects will be stored using the "**Projects folder path**" setting.

#### Project Overview File

Zonzon's project management also allows you to automatically generate an overview file (in `.md` format) for each new project. To use this feature, you must specify the template to be used to generate the file in the appropriate field.

The relevant setting is "**Project overview template path**".

Since version `2.0.0`, the "**Project overview file name**" setting is no longer available. Each generated overview file is now named after the project it belongs to. This change made it possible to implement the backlink system. Without it, backlinks between projects could fail to work correctly, potentially redirecting users to another project's overview note.

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

### Content identifiers

Originally intended to codify content in agile project management, Zonzon's project management implements a content ID system.

To use this feature, you must define the property in which the assigned ID will be stored using the "**Identifier property name**" setting.

There are three types of IDs. Project IDs must be unique and are chosen by the user when creating a project. Epic and user story IDs are generated automatically. They are based on the number of epics or user stories already present in a project.

The latter two can be prefixed at the user's discretion. You can define these prefixes using the "**Epic identifier prefix**" and "**User story identifier prefix**" settings.

### Content links

Zonzon's project management automatically links content to one another when they are created.

To use this feature, you must define the properties in which the generated backlinks will be stored. The relevant settings are "**Project link property name**" and "**Epic link property name**".

A project's overview file will be linked in every epic and user story belonging to that project. Similarly, an epic will be linked in every user story belonging to that epic.

### Placeholders

To keep templates reusable and notes clear, detailed, and well-structured, Zonzon's project management provides several placeholders that allow you to dynamically insert data from your projects.

- `{{ epic-identifier }}` automatically inserts the epic identifier;
- `{{ project-identifier }}` automatically inserts the project identifier;
- `{{ project-name }}` automatically inserts the project name;
- `{{ title }}` automatically inserts the title. By default, it uses the file name, but if an inline title is specified, it takes priority;
- `{{ user-story-identifier }}` automatically inserts the user story identifier.

Zonzon's project management also supports a special callout type, `template-help`, which is used just like a regular callout:

```markdown
> [!template-help] Are otters cute?
> Yes. Without a shadow of a doubt!
```

The only difference compared to a regular callout is that the extension will not copy it into files generated from a template containing it. It is therefore intended for documenting specific sections of your notes, usage instructions, default values, and so on. This can be useful when sharing your templates or revisiting them two months after writing them because you've forgotten how something works.

## License & Additional Information

This project is released under the MIT License.

Thank you for reading this far! I developed this plugin in just a few days to meet a personal need. I decided to make it publicly available because you might find it useful too.

Feel free to suggest new features or report any bugs you encounter. However, I cannot guarantee that suggested features will be implemented, as this plugin is primarily intended to meet my own needs.

I hope Zonzon's project management proves useful to you!
