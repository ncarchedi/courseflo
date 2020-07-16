// normal items
import Text from "../items/Text";
import Video from "../items/Video";
import YouTube from "../items/YouTube";
import Document from "../items/Document";
import Image from "../items/Image";
import SingleSelect from "../items/SingleSelect";
import MultiSelect from "../items/MultiSelect";
import LongText from "../items/LongText";
import ShortText from "../items/ShortText";

// editable items
import EditableText from "../editableItems/EditableText";
import EditableVideo from "../editableItems/EditableVideo";
import EditableYouTube from "../editableItems/EditableYouTube";
import EditableDocument from "../editableItems/EditableDocument";
import EditableImage from "../editableItems/EditableImage";
import EditableSingleSelect from "../editableItems/EditableSingleSelect";
import EditableMultiSelect from "../editableItems/EditableMultiSelect";
import EditableLongText from "../editableItems/EditableLongText";
import EditableShortText from "../editableItems/EditableShortText";

export default function getItemComponent(type, editable) {
  let Component;

  switch (type) {
    case "Text":
      Component = editable ? EditableText : Text;
      break;
    case "Video":
      Component = editable ? EditableVideo : Video;
      break;
    case "YouTube":
      Component = editable ? EditableYouTube : YouTube;
      break;
    case "Document":
      Component = editable ? EditableDocument : Document;
      break;
    case "Image":
      Component = editable ? EditableImage : Image;
      break;
    case "SingleSelect":
      Component = editable ? EditableSingleSelect : SingleSelect;
      break;
    case "MultiSelect":
      Component = editable ? EditableMultiSelect : MultiSelect;
      break;
    case "LongText":
      Component = editable ? EditableLongText : LongText;
      break;
    case "ShortText":
    case "TextInput": // legacy support
      Component = editable ? EditableShortText : ShortText;
      break;
    default:
      Component = null;
  }

  return Component;
}
