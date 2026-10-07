package com.melonmarket.backend.melon;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.melonmarket.backend.melon.dto.MelonPostRequest;
import com.melonmarket.backend.melon.dto.MelonPostResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MelonPostService {

	private final MelonPostRepository melonPostRepository;

	public List<MelonPostResponse> findAll() {
		return melonPostRepository.findAllByOrderByCreatedAtDescIdDesc().stream()
				.map(MelonPostResponse::from)
				.toList();
	}

	public MelonPostResponse findById(Long id) {
		return MelonPostResponse.from(getPost(id));
	}

	@Transactional
	public MelonPostResponse create(MelonPostRequest request) {
		MelonPost post = new MelonPost(
				request.title(),
				request.content(),
				request.price(),
				request.sellerName(),
				request.region(),
				request.melonType(),
				request.status());
		return MelonPostResponse.from(melonPostRepository.save(post));
	}

	@Transactional
	public MelonPostResponse update(Long id, MelonPostRequest request) {
		MelonPost post = getPost(id);
		post.update(
				request.title(),
				request.content(),
				request.price(),
				request.sellerName(),
				request.region(),
				request.melonType(),
				request.status());
		melonPostRepository.flush();
		return MelonPostResponse.from(post);
	}

	@Transactional
	public void delete(Long id) {
		melonPostRepository.delete(getPost(id));
	}

	private MelonPost getPost(Long id) {
		return melonPostRepository.findById(id)
				.orElseThrow(() -> new MelonPostNotFoundException(id));
	}

}
