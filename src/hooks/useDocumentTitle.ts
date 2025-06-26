import { useEffect, useState } from 'react';

/**
 * Update the document (i.e. browser tab) title.
 * @description
 * Can be passed an initial value to change it once,
 * and/or can be used to set the title declaratively via the returned `setTitle` function
 * @param initialTitle The title to set the document to
 * @returns A function to change the title again
 */
const useDocumentTitle = (initialTitle: string = '') => {
  const [title, setTitle] = useState(initialTitle || document.title);
  useEffect(() => {
    document.title = title;
  }, [title]);

  return setTitle;
};

export default useDocumentTitle;
