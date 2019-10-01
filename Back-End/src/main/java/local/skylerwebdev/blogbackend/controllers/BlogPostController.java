package local.skylerwebdev.blogbackend.controllers;

import local.skylerwebdev.blogbackend.models.BlogPost;
import local.skylerwebdev.blogbackend.services.BlogPostService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/posts")
public class BlogPostController
{
    @Autowired
    private BlogPostService blogPostService;
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @GetMapping(value = "/all",
            produces = {"application/json"})
    public ResponseEntity<?> listAllBlogPosts(HttpServletRequest request,
                                              @RequestParam(defaultValue = "0") int page,
                                              @RequestParam(defaultValue = "5") int size)
    {
        logger.trace(request.getMethod()
                .toUpperCase() + " " + request.getRequestURI() + " accessed");

        Page<BlogPost> myUsers = blogPostService.findPaginated(page,size);
        return new ResponseEntity<>(myUsers,
                HttpStatus.OK);
    }
    //    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PostMapping(value = "/user/{uuid}",
            consumes = {"application/json"},
            produces = {"application/json"})
    public ResponseEntity<?> addNewBlogPost(HttpServletRequest request,
                                        @Valid
                                        @RequestBody
                                        BlogPost newBlogPost,
                                        @PathVariable
                                        long uuid) throws URISyntaxException
    {
        logger.trace(request.getMethod()
                .toUpperCase() + " " + request.getRequestURI() + " accessed");
//
        System.out.println(uuid + "uuid from controller");
        newBlogPost = blogPostService.save(newBlogPost, uuid);
        System.out.println(uuid + "uuid from controller");


        // set the location header for the newly created resource
        HttpHeaders responseHeaders = new HttpHeaders();
        URI newUserURI = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{uuid}")
                .buildAndExpand(newBlogPost.getPostid())
                .toUri();
        responseHeaders.setLocation(newUserURI);

        return new ResponseEntity<>(null,
                responseHeaders,
                HttpStatus.CREATED);
    }
    @PutMapping(value = "/update/{uuid}/{postid}")
    public ResponseEntity<?> updateBlogPost(HttpServletRequest request,
                                        @RequestBody
                                                BlogPost updateBlogPost,
                                        @PathVariable
                                                long uuid,
                                        @PathVariable
                                        long postid)
    {
        logger.trace(request.getMethod()
                .toUpperCase() + " " + request.getRequestURI() + " accessed");

        blogPostService.update(updateBlogPost,uuid,postid);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @DeleteMapping("/{uuid}/{postid}")
    public ResponseEntity<?> deleteBlogPostById(HttpServletRequest request,
                                            @PathVariable
                                                    long postid,
                                                @PathVariable
                                                long uuid)
    {
        logger.trace(request.getMethod()
                .toUpperCase() + " " + request.getRequestURI() + " accessed");

        blogPostService.delete(postid, uuid);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
