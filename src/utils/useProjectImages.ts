import { useState, useEffect } from 'react';

export function useProjectImages(projectId: string) {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    fetch(`/api/projects/${projectId}/images`)
      .then(res => res.json())
      .then(data => {
        if (data.images && data.images.length > 0) {
          setImages(data.images);
        }
      })
      .catch(err => console.error("Error fetching project images:", err));
  }, [projectId]);

  return images;
}
