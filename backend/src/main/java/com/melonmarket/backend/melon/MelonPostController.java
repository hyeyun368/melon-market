package com.melonmarket.backend.melon;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.melonmarket.backend.melon.dto.MelonPostRequest;
import com.melonmarket.backend.melon.dto.MelonPostResponse;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/melons")
@RequiredArgsConstructor
public class MelonPostController {

	private final MelonPostService melonPostService;

	@GetMapping
	public List<MelonPostResponse> list() {
		return melonPostService.findAll();
	}

	@GetMapping("/{id}")
	public MelonPostResponse detail(@PathVariable Long id) {
		return melonPostService.findById(id);
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public MelonPostResponse create(@Valid @RequestBody MelonPostRequest request) {
		return melonPostService.create(request);
	}

	@PutMapping("/{id}")
	public MelonPostResponse update(@PathVariable Long id, @Valid @RequestBody MelonPostRequest request) {
		return melonPostService.update(id, request);
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		melonPostService.delete(id);
	}

}
