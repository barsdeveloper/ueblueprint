# Development Guide
Getting started with the development of this application is very easy. It has a (arguably) well defined object-oriented architecture and separation of concerns.

Before starting, the gentle reader might want to make sure to be familiar with the [Lit](https://lit.dev/) library and its element [lifecycle](https://lit.dev/docs/components/lifecycle/). This library is used extensively throught the application to keep the HTML elements in sync with the data and avoid updating the DOM too often. The original author is aware that there are way more popular alternatives out there like React, Vue and Svelte, but the design of Lit fits very well into the original design of this application: vanilla JavaScript and object-oriented. This allowed the introduction of Lit with a relatively small amount of changes to the existing code because the decision to use Lit was made at a later point in time. One important detail is that it does not make use of the shadow DOM (part of the Web Components), the real reason is that the development started without using Lit but it is still nice to be able to have a global CSS style (which wouldn't be possibile with a shadow root) so that restyling the library is just a matter of adding another CSS file and rewrite a few properties.

The only other external library that is used here is [Parsernostrum](https://github.com/barsdeveloper/parsernostrum): a very small but capable text parsing library used to deserialize the text produced by the UE Blueprint Editor.

## Setup

Clone the repository then run the command:

```
npm install
```

In order to download the dependencies of the project.

An http server is also needed to test the changes, one option is `http-server`:

```
npm install -g http-server
```

In case of linux and permission error then:

```
npm config set prefix ~/.local
```

And try again the previous command. The path `~/.local/bin` should be added to the `$PATH` environment variable, therefor the following command will be available in the command line:

```
http-server
```

The example page will be available at the addreess `http://127.0.0.1:8080/`

Now the iteration steps simply are: make a change to the code, then run:

```
npm run build
```

And refresh the HTML page possibly holding `Shift`.

## Overview
There are a few concepts that must be assimilated in order to understand the design. Those concepts are in general each mapped into a subfolder in `js/`.

### Entity
An **Entity** is a simple object that only stores data, it doesn’t perform any actions. The base class for all entities is `IEntity`. Its main job is to initialize an entity using data from an input object or a predefined attributes field. This setup has resulted in a somewhat unconventional runtime type system. Each subclass of `IEntity` defines its `attributes` as a object static field, where each entry represents another `IEntity` subclass (class object, not instance). Additionally, entities handle their own serialization and deserialization using the `serialize()` method and a `grammar` attribute, which parses entity data from the blueprint code.

### Element
An **Element** is a custom HTML element, with its tag name defined in the class file. At the top of the hierarchy is `IElement`, which extends `LitElement`. You can think of `IElement` as a bridge between an *Entity* and a *Template*, these are passed as arguments to its constructor. Moreover, `IElement` ensures that the lifecycle events provided by `LitElement` are passed down to the template, allowing the template to hook into them.

### Template
In Lit, HTML templates are typically returned from an element’s `render()` method. However, this approach makes it difficult to apply different templates and UI behaviors to the same element, since a custom element can only be associated with one class.
For example, consider a `<ueb-pin>` element inside a graph node. It may or may not have an input, and if it does, the input type could be text, a checkbox, a vector. To handle this flexibility, rendering is moved from the *Element* to the *Template*. Instead of using inheritance (which is limiting), we use composition, allowing the same element to have different templates.

Templates have access to the same lifecycle methods as elements. This is achieved in `IElement`, which forwards lifecycle calls to the corresponding methods in the template. The template hierarchy can introduce new behaviors that subclasses can override. For example, `IInputPinTemplate` defines behaviors that can be customized by its subclasses.

### Input
These classes handle input events (such as mouse and keyboard interactions) and map them to operations on the graph. They support complex interactions, like dragging with the mouse, which originate from JavaScript input events. In contrast, simpler events such as click or focus are handled directly within Lit templates.

### Selection
This module contains a few classes focused solely on selecting nodes. It was originally designed to optimize selection for graphs with a very large number of nodes, but in practice, this optimization is of limited use. The real performance bottleneck in such cases is DOM rendering, not the JavaScript logic that determines which nodes are selected.
There are two selection models:
1. Simple Model: every frame, it checks all nodes in the graph to determine whether they are selected.
2. Fast Model: uses a structured index of nodes to limit lookups, reducing the need to scan the entire graph.

### Decoding
This handles blueprint interpretation, defining node *Template* classes, colors, icons, and other attributes like the title of a node.

## Code Style

### Formatting
Please refer to the following rules, in no particular order:
* The formatter of reference is the one from Visual Studio Code.
* Semicolons at the end of the lines must be removed (already set for VS Code).
* Order of elements in a class is: first variables then constructor, then methods; first static then instance members; first private then public.
* At the end of the file there must be exactly one empty line (already set for VS Code).
* The line must not exceed 120 characters (ruler already set for VS Code).

### File organization
There must be exactly one class in each file and the name of the file is the same as the class it contains.

### Naming conventions
Classes follow the `PascalCase` naming convention. Variables follow the `camelCase` convention. Static or global constants follow the `ALL_CAPS` naming convention, DOM names (css class, id, html elements) they do follow the `kebab-case` and, because they might collide with other names, they all start with `ueb-`. The files do have the exact same name as the class they contain, otherwise they follow the `camelCase` naming convention.
