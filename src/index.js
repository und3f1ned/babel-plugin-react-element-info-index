// @flow weak
import {basename, extname} from 'path';

export default function reactElementInfo({types: t}) {
  const defaultPrefix = 'data-qa';
  let prefix;
  let filenameAttr;
  let index = 0;

  const visitor = {
    Program(path, state) {
      if (state.opts.prefix) {
        prefix = `data-${state.opts.prefix}`;
      } else {
        prefix = defaultPrefix;
      }
      filenameAttr = `${prefix}`;
    },

    JSXOpeningElement(path, state) {
      const openingElement = path.container.openingElement;
      const attributes = openingElement.attributes;

      const newAttributes = [];

      const elementName = (openingElement.name && openingElement.name.name) ||
        (openingElement.name.property && openingElement.name.property.name);

      if (elementName === 'Fragment') {
        return;
      }

      let name;
      if (state.file && state.file.opts) {
        if (state.file.opts.basename) {
          name = state.file.opts.basename;
        } else if (state.file.opts.filename) {
          name = basename(state.file.opts.filename, extname(state.file.opts.filename));
        }
      }

      if (name) {
        newAttributes.push(t.jSXAttribute(
          t.jSXIdentifier(filenameAttr),
          t.stringLiteral(`${elementName}_${name}_${index}`)
        ));
      }

      index++;

      attributes.push(...newAttributes);
    },
  };

  return {
    visitor,
  };
}
