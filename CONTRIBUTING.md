# Development Guide
Getting started with the development of this application is very easy because it has a (arguably) well defined object-oriented architecture and separation of concerns.

Before starting, the gentle reader might want to make sure to be familiar with the [Lit](https://lit.dev/) library and its element [lifecycle](https://lit.dev/docs/components/lifecycle/). This library is used extensively throught the application to keep the HTML elements in sync with the data and avoid updating the DOM too often. The original author is aware that there are way more popular alternatives out there like React, Vue and Svelte, but the design of Lit fits very well into the original design of this application: vanilla JavaScript and object-oriented. This allowed the introduction of Lit with a relatively small amount of changes to the existing code, yes because the decision to use Lit was made at a later point in time. One important detail is that it does not make use of the shadow DOM (part of the Web Components), the real reason is that the development started without using Lit but it is still nice to be able to have a global CSS style (which wouldn't be possibile with a shadow root) so that restyling the library is just a matter of adding another CSS file and rewrite a few properties.

The only other external library that is used here is the awesome [Parsimmon](https://github.com/jneen/parsimmon): a very small but capable text parsing library used to deserialize the text produced by the Unreal Engine Blueprint Editor.

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
An Entity is just a data holder object that does not really do anything by itself, it has a purely information storage related purpose. The top class at the hierarchy of entities is `IEntity`. This one is a bit more complicated in the sense that it does the initialization of the entity in its constructor according to the information contained in the object provided as an argument or from the attributes static field. This ended up being a somewhat wacky runtime type system. Each subclass can specify its attributes static member variable of type object where each entry is either a value (the default value the attribute will have), a function (called to generate such default value) or an object and in that case it will be of type `AttributeInformation` (please note that in case one wants to assign as default value a specific object, the solution is either to wrap it into a `AttributeInformation` object or to return it from a function).

### Grammar and Serializer
In the `serialization/` folder the gentle reader will find all the classes responsible for transforming entities from and to text that the UE Blueprint Enditor can understand. One important class here is `Grammar` that contains similar formal grammar rules that use the [Parsimmon library](https://github.com/jneen/parsimmon) to create entities from Blueprint text. `ISerializer` is at the top of the serializer classes hierarchy and it uses a factory design pattern to register serializers for the various entities types (check `js/serialization/initializeSerializerFactory.js`). It does both read and write of entities: to read it will use the Grammar after creating a language using a function from Parsimmon, to write it will use methods from the class itself.

Grammar is usually the first place to look when pasting valid Blueprint code does fail. Most likely newer version of Unreal Engine did add some new data type that was not implemented yet (or this library never managed to handle it in the first place). In that case the approach should be trying to fix the existing grammar and entities to accept it, then implement the new entities and attributes.

### Element
Each element is just a custom HTML element type and its tag name is defined in the class file. The top level of the hierarchy is `IElement` and it inherits from `LitElement`. This class can be thought as an association between an entity and a template (and those are the arguments of the constructor). The top class `IElement` does propagate the lifecycle provided by `LitElement` to the template so that a template can hook into it.

### Template
When looking at the Lit documentation, it might be noticed that usually HTML templates are returned as part of the `render()` method of an Element. The problem with such approach is that it makes it hard to have very different templates and UI behavior for the same element in a natural way (by means of inheritance because a custom element cannot be mapped to multiple classes). Take for example a `<ueb-pin>` in a graph node, it may or may not have any input and if it has one, the input might be a checkbox, a vector or something completely different like a texture. For this reason the responsibility to render the HTML content is moved from the Element to the Template and inheritance is replaced with composition so that two same elements can have different templates.
Templates do have access to the same lifecycle as elements have, this is implemented in the IElement class that calls, for each method in the lifecycle, the relative method in the template. Moreover the templates hierarchy can also introduce new behaviors that can be replaced by subclasses, one example of such is IInputPinTemplate.

### Input
Classes used to map input events (generated from a mouse or a keyboard for example) to operations on the graph. They do model advanced user interaction (like mouse drag) that are originated by input JavaScript events. Simpler events (like click or focus), are implemented in the lit templates directly.

### Selection
It contains just a few classes related exclusively to the operation of selecting nodes. It is an (arguably useless) attempt to optimize the selection in case of graphs with a very large numbers of nodes (it is not really usefull because in the case of many many nodes, the bootleneck becomes the DOM rendering, not deciding in JavaScript which nodes are selected and which are not even though this happens every frame). Selection has two models: one very simple that checks every frame all the nodes in the graph to see whether or not they are selected by the selector, and the fast model that attemps to optimize the number of nodes that are looked up at, much more complicated and not super usefull as stated before.

## Code Style

### Formatting
Please refer to the following rules, in no particular order:
* The formatter of reference is the one from Visual Studio Code.
* Semicolons at the end of the lines must be removed (already set for VS Code).
* Order of elements in a class is: first variables then constructor, then methods; first static then instance members; first private then public.
* At the end of the file there must be exactly one empty line (already set for VS Code).

### File organization
There must be exactly one class in each file and the name of the file is the same as the class it contains.

### Naming conventions
Classes follow the `PascalCase` naming convention. Variables follow the `camelCase` convention. Static or global constants follow the `ALL_CAPS` naming convention, DOM names (css class, id, html elements) they do follow the `kebab-case` and, because they might collide with other names, they all start with `ueb-`. The files do have the exact same name as the class they contain, otherwise they follow the `camelCase` naming convention.
