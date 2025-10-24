package main.java.PROJECTS.exception;

@RestControllerAdvice
public class globalexceptionhandler {
    @exceptionhandler(resourcenotfound.class)
    public responseentity<ApiResponse> handleResourceNotFoundException(resourcenotfound ex){
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(ex.getMessage(), false));
    }
    
    @exceptionhandler(Exception.class)
    public responseentity<ApiResponse> handleGlobalException(Exception ex){
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(false,"An unexpected error occurred."+ ex.getMessage()));
    }
}
