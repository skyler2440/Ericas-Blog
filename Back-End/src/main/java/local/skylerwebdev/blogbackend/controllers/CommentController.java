package local.skylerwebdev.blogbackend.controllers;

import local.skylerwebdev.blogbackend.models.Comment;
import local.skylerwebdev.blogbackend.services.CommentService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

@RestController
@RequestMapping("/comments")
public class CommentController
{
    @Autowired
    CommentService commentService;
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @PostMapping(value = "/{uuid}/{postid}",
            consumes = {"application/json"},
            produces = {"application/json"})
    public ResponseEntity<?> addNewComment(HttpServletRequest request,
                                            @Valid
                                            @RequestBody
                                                    Comment newComment,
                                            @PathVariable
                                                    long uuid,
                                           @PathVariable
                                                    long postid) throws URISyntaxException
    {
        logger.trace(request.getMethod()
                .toUpperCase() + " " + request.getRequestURI() + " accessed");
//
        System.out.println(uuid + "uuid from controller");
        newComment = commentService.save(newComment, uuid, postid);
        System.out.println(uuid + "uuid from controller");


        // set the location header for the newly created resource
        HttpHeaders responseHeaders = new HttpHeaders();
        URI newUserURI = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{uuid}")
                .buildAndExpand(newComment.getCommentid())
                .toUri();
        responseHeaders.setLocation(newUserURI);

        return new ResponseEntity<>(null,
                responseHeaders,
                HttpStatus.CREATED);
    }
    @PutMapping(value = "/update/{uuid}/{commentid}")
    public ResponseEntity<?> updateBlogPost(HttpServletRequest request,
                                            @RequestBody
                                                    Comment updateComment,
                                            @PathVariable
                                                    long uuid,
                                            @PathVariable
                                                    long commentid)
    {
        logger.trace(request.getMethod()
                .toUpperCase() + " " + request.getRequestURI() + " accessed");

        commentService.update(updateComment,uuid,commentid);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @DeleteMapping("/{uuid}/{commentid}")
    public ResponseEntity<?> deleteBlogPostById(HttpServletRequest request,
                                                @PathVariable
                                                        long commentid,
                                                @PathVariable
                                                        long uuid)
    {
        logger.trace(request.getMethod()
                .toUpperCase() + " " + request.getRequestURI() + " accessed");

        commentService.delete(commentid, uuid);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
