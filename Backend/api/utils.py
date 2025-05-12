def is_lesson_completed(user, lesson):
    # Check if all videos in the lesson are completed
    videos = lesson.videos.all()
    if not videos.exists():
        return False
    
    for video in videos:
        try:
            progress = VideoProgress.objects.get(user=user, video=video)
            if not progress.is_completed:
                return False
        except VideoProgress.DoesNotExist:
            return False
    
    return True